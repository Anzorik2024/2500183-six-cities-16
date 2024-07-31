import {useEffect, useState, useRef} from 'react';
import leaflet, {Map as LeafletMap} from 'leaflet';

type UseMapProps = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  containerRef: React.RefObject<HTMLElement | null>;
}

const TITLE_LAYER_URL_PATTERN =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TITLE_LAYER_URL_ATTRIBUTION =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';


function useMap({location, containerRef}: UseMapProps) : leaflet.Map | null {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (containerRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(containerRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom
      });

      leaflet
        .tileLayer(TITLE_LAYER_URL_PATTERN, {
          attribution: TITLE_LAYER_URL_ATTRIBUTION,
        })
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [containerRef, location]);

  return map;
}

export default useMap;
