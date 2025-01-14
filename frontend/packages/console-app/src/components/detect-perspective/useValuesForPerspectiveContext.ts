import * as React from 'react';
import { PerspectiveType } from '@console/dynamic-plugin-sdk';
import { usePerspectives } from '@console/shared/src';
import { usePreferredPerspective } from '../user-preferences';
import { useLastPerspective } from './useLastPerspective';

export const useValuesForPerspectiveContext = (): [
  PerspectiveType,
  (newPerspective: string) => void,
  boolean,
] => {
  const perspectiveExtensions = usePerspectives();
  const [lastPerspective, setLastPerspective, lastPerspectiveLoaded] = useLastPerspective();
  const [preferredPerspective, , preferredPerspectiveLoaded] = usePreferredPerspective();
  const [activePerspective, setActivePerspective] = React.useState<string>('');

  const loaded = lastPerspectiveLoaded && preferredPerspectiveLoaded;

  const latestPerspective = loaded && (preferredPerspective || lastPerspective);

  const perspective = activePerspective || latestPerspective;

  const isValidPerspective =
    loaded && perspectiveExtensions.some((p) => p.properties.id === perspective);

  const setPerspective = (newPerspective: string) => {
    setLastPerspective(newPerspective);
    setActivePerspective(newPerspective);
  };

  return [isValidPerspective ? perspective : undefined, setPerspective, loaded];
};
