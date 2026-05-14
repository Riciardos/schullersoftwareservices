import { useCallback, useContext } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import { UserProfileContext } from '../containers/UserProfileProvider';

const config = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 60,
      density: { enable: true, area: 800 },
    },
    color: {
      value: ['#FF8000', '#FF9A3C', '#cc6600'],
    },
    opacity: {
      value: { min: 0.1, max: 0.35 },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    links: {
      enable: true,
      distance: 150,
      color: '#FF9A3C',
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: 'none' as const,
      outModes: 'bounce' as const,
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
      onClick: { enable: true, mode: 'push' },
    },
    modes: {
      grab: {
        distance: 180,
        links: { opacity: 0.5 },
      },
      push: { quantity: 3 },
    },
  },
  detectRetina: true,
};

function ParticleBackground() {
  const { enableParticles } = useContext(UserProfileContext);

  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (enableParticles &&
    <Particles
      id="tsparticles"
      init={init}
      options={config}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />);
}

export default ParticleBackground;
