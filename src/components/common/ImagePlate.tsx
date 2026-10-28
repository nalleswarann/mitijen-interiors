import React, { useMemo, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { IMG_CONFIG } from '../../data/images';
import { art } from '../../utils/proceduralArt';
import { LiquidDistortionCanvas } from './LiquidDistortionCanvas';
import { ErrorBoundary } from './ErrorBoundary';
import type { LiquidDistortionConfig } from '../../utils/liquidShader';

export interface ImagePlateProps {
  imageKey: string;
  className?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  id?: string;
  enableLiquid?: boolean;
  liquidConfig?: Partial<LiquidDistortionConfig>;
  externalTriggerRef?: React.RefObject<HTMLElement | null>;
}

const ImagePlate = forwardRef<HTMLDivElement, ImagePlateProps>(({
  imageKey,
  className = '',
  ariaLabel,
  style,
  children,
  id,
  enableLiquid = true,
  liquidConfig,
  externalTriggerRef
}, ref) => {
  const config = IMG_CONFIG[imageKey];
  const [imgLoaded, setImgLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => containerRef.current, []);

  const setMergedRef = (el: HTMLDivElement | null) => {
    containerRef.current = el;
  };

  const svgContent = useMemo(() => {
    if (!config) return '';
    return art(imageKey, config.p);
  }, [imageKey, config]);

  const hasPhoto = Boolean(config?.img && config.img.length > 0);
  const isHero = id === 'heroPlate';

  return (
    <div
      ref={setMergedRef}
      id={id}
      className={`plate ${className}`.trim()}
      role="img"
      aria-label={ariaLabel}
      style={style}
    >
      <i dangerouslySetInnerHTML={{ __html: svgContent }} />

      {hasPhoto && (
        <>
          <img
            src={config.img}
            alt=""
            loading="eager"
            onLoad={() => setImgLoaded(true)}
            style={{
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.6s ease'
            }}
          />

          {enableLiquid && (
            <ErrorBoundary>
              <LiquidDistortionCanvas
                src={config.img}
                isHero={isHero}
                containerRef={containerRef}
                externalTriggerRef={externalTriggerRef}
                options={liquidConfig}
              />
            </ErrorBoundary>
          )}
        </>
      )}

      {children}
    </div>
  );
});

export { ImagePlate };
export default ImagePlate;