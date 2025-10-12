import { useEffect, useRef } from 'react';
import L, { type LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useConfigContext } from '@/contexts/config-context';

interface EntityMapProps {
  imageId: string;
  center: [number, number];
  className?: string;
}

export const EntityMap = ({ imageId, center, className = '' }: EntityMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const config = useConfigContext();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const templateUrlWithImage = config.appConfig.imageStreamerTemplateUrl.replace('{imageId}', imageId);

    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
    }).setView(center as LatLngExpression, 13);

    const layer = L.tileLayer(templateUrlWithImage, {
      maxZoom: 19,
    });

    layer.addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [config]);

  return <div ref={mapRef} className={className} />;
};
