export interface LiquidDistortionConfig {
  strength?: number;        // Maximum displacement amplitude
  radius?: number;          // Influence radius in UV space
  recoverySpeed?: number;   // Damping rate per frame when resting
  waveFrequency?: { x: number; y: number }; // Wave frequencies
  waveSpeed?: number;       // Oscillation speed
  dispersion?: number;      // Subtle chromatic dispersion
  velocityFactor?: number;  // Multiplier for speed-to-ripple ratio
}

export const DEFAULT_LIQUID_CONFIG: Required<LiquidDistortionConfig> = {
  strength: 0.020,
  radius: 0.46,
  recoverySpeed: 0.92,
  waveFrequency: { x: 14.0, y: 32.0 },
  waveSpeed: 3.8,
  dispersion: 0.0,
  velocityFactor: 0.85
};

export const liquidVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.x, position.y, 0.0, 1.0);
  }
`;

export const liquidFragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2 uResolution;        // Container size (width, height)
  uniform vec2 uImageResolution;   // Natural image size (width, height)
  uniform vec2 uMouse;             // Mouse position in UV space [0, 1]
  uniform vec2 uVelocity;          // Mouse velocity vector
  uniform float uIntensity;        // Active intensity [0, 1], decays when still
  uniform float uTime;             // Elapsed time
  uniform float uStrength;         // Distortion amplitude
  uniform float uRadius;           // Distortion radius
  uniform vec2 uWaveFreq;          // Ripple frequency {x, y}
  uniform float uWaveSpeed;        // Ripple speed
  uniform float uDispersion;       // Chromatic aberration / dispersion

  #define MAX_TRAIL 8
  // Each trail element: xy = pos, z = age [0, 1], w = strength
  uniform vec4 uTrail[MAX_TRAIL];

  varying vec2 vUv;

  // 2D Simplex noise for fluid organic irregularities
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Exact object-fit: cover implementation matching CSS object-position: 50% 42%
  vec2 getCoverUv(vec2 uv) {
    if (uImageResolution.x <= 0.0 || uImageResolution.y <= 0.0 || uResolution.x <= 0.0 || uResolution.y <= 0.0) {
      return uv;
    }
    vec2 s = uResolution / uImageResolution;
    float maxScale = max(s.x, s.y);
    vec2 newSize = uImageResolution * maxScale;
    vec2 uvOffset = vec2((newSize.x - uResolution.x) * 0.5, (newSize.y - uResolution.y) * 0.58);
    return (uv * uResolution + uvOffset) / newSize;
  }

  void main() {
    // If completely at rest, sample undistorted image directly
    if (uIntensity <= 0.0001) {
      bool hasActiveTrail = false;
      for (int i = 0; i < MAX_TRAIL; i++) {
        if (uTrail[i].w > 0.001) {
          hasActiveTrail = true;
          break;
        }
      }
      if (!hasActiveTrail) {
        vec2 baseUv = clamp(getCoverUv(vUv), 0.0, 1.0);
        gl_FragColor = texture2D(uTexture, baseUv);
        return;
      }
    }

    float aspect = uResolution.x / max(uResolution.y, 1.0);

    // Aspect-corrected UV and Mouse coordinates for isotropic circular ripples
    vec2 aspectUv = vUv;
    aspectUv.x *= aspect;

    vec2 aspectMouse = uMouse;
    aspectMouse.x *= aspect;

    float distToMouse = length(aspectUv - aspectMouse);

    // Smooth Gaussian/Hermite falloff around cursor position
    float cursorInfluence = smoothstep(uRadius, 0.0, distToMouse);

    // Subtle 2D procedural noise for organic water eddies
    float noiseVal = snoise(vUv * 5.0 + vec2(uTime * 0.35, uTime * 0.25));

    // 1. Primary horizontal liquid wave (produces the signature heat-wave / water ripple bands)
    float waveY = vUv.y * uWaveFreq.y - uTime * uWaveSpeed + vUv.x * uWaveFreq.x + noiseVal * 1.3;
    float primaryWave = sin(waveY);

    // 2. Secondary counter-harmonic for fluid depth
    float secondaryWave = cos(vUv.y * (uWaveFreq.y * 1.65) + uTime * (uWaveSpeed * 0.85) - vUv.x * 12.0 + noiseVal);

    // 3. Radial water ripple emanating from the pointer
    float radialWave = sin(distToMouse * 36.0 - uTime * (uWaveSpeed * 1.4));

    // Combine waves into horizontal and vertical displacement vectors (organic water undulation)
    float dispX = (primaryWave * 0.65 + secondaryWave * 0.25 + radialWave * 0.35 * cursorInfluence + noiseVal * 0.12);
    float dispY = (cos(vUv.x * uWaveFreq.x * 1.8 - uTime * uWaveSpeed * 0.7 + vUv.y * 10.0) * 0.35 + radialWave * 0.45 * cursorInfluence + noiseVal * 0.1) * 0.5;

    // Fluid influence: focused softly under cursor with very mild ambient reaction
    float fluidInfluence = mix(0.06, 1.0, cursorInfluence);

    // Apply directional velocity push (responsive)
    vec2 velPush = uVelocity * 0.12 * cursorInfluence;

    // Direct cursor and propagated liquid displacement
    vec2 totalDisp = (vec2(dispX, dispY) * fluidInfluence * uIntensity + velPush);

    // 4. Trail ripples: expanding rings behind cursor movement path (softened)
    vec2 trailDisp = vec2(0.0);
    for (int i = 0; i < MAX_TRAIL; i++) {
      float strength = uTrail[i].w;
      if (strength <= 0.001) continue;

      vec2 tPos = uTrail[i].xy;
      tPos.x *= aspect;
      float age = uTrail[i].z; // 0.0 to 1.0

      float tDist = length(aspectUv - tPos);

      // Expanding circular wave ring
      float ringRadius = age * (uRadius * 1.0);
      float ringThickness = 0.06 + age * 0.08;
      float ringDist = abs(tDist - ringRadius);
      float ringFalloff = exp(-(ringDist * ringDist) / (2.0 * ringThickness * ringThickness));

      // Dissipation over time
      float dissipation = (1.0 - age) * (1.0 - age) * strength;

      // Ripple modulation
      float ripple = sin(tDist * 38.0 - age * 13.0 + vUv.y * 16.0);

      trailDisp.x += ripple * ringFalloff * dissipation;
      trailDisp.y += cos(tDist * 34.0 - age * 11.0) * ringFalloff * dissipation * 0.35;
    }

    totalDisp += trailDisp * 0.32;

    // Scale displacement by overall strength
    totalDisp *= uStrength;

    // Distort UV and map to cover coordinates
    vec2 distortedScreenUv = vUv + totalDisp;
    vec2 sampleUv = clamp(getCoverUv(distortedScreenUv), vec2(0.001), vec2(0.999));

    // Subtle chromatic dispersion for realistic optical refraction (very mild)
    if (uDispersion > 0.0001 && length(totalDisp) > 0.0002) {
      vec2 rUv = clamp(getCoverUv(distortedScreenUv + totalDisp * (uDispersion * 8.0)), vec2(0.001), vec2(0.999));
      vec2 bUv = clamp(getCoverUv(distortedScreenUv - totalDisp * (uDispersion * 8.0)), vec2(0.001), vec2(0.999));

      float r = texture2D(uTexture, rUv).r;
      float g = texture2D(uTexture, sampleUv).g;
      float b = texture2D(uTexture, bUv).b;
      float a = texture2D(uTexture, sampleUv).a;

      gl_FragColor = vec4(r, g, b, a);
    } else {
      gl_FragColor = texture2D(uTexture, sampleUv);
    }
  }
`;
