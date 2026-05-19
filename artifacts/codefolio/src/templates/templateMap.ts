import type { ComponentType } from 'react';
import MinimalUniversalTemplate from './MinimalUniversalTemplate';
import FrontendProTemplate from './FrontendProTemplate';
import FullStackNexusTemplate from './FullStackNexusTemplate';
import BackendCoreTemplate from './BackendCoreTemplate';
import AIMatrixTemplate from './AIMatrixTemplate';
import CreativeStudioTemplate from './CreativeStudioTemplate';
import DesignCanvasTemplate from './DesignCanvasTemplate';
import CreativeMotionTemplate from './CreativeMotionTemplate';
import PixelForgeTemplate from './PixelForgeTemplate';
import LensCraftTemplate from './LensCraftTemplate';

export const templateMap: Record<string, ComponentType<{ data: any }>> = {
  // Stream-assigned templates
  'developer-pro': FrontendProTemplate,
  'design-canvas': DesignCanvasTemplate,
  'lens-craft': LensCraftTemplate,

  // Existing templates
  'minimal-universal': MinimalUniversalTemplate,
  'frontend-pro': FrontendProTemplate,
  'fullstack-nexus': FullStackNexusTemplate,
  'backend-core': BackendCoreTemplate,
  'ai-matrix': AIMatrixTemplate,
  'creative-studio': CreativeStudioTemplate,
  'creative-motion': CreativeMotionTemplate,
  'pixel-forge': PixelForgeTemplate,

  // Backward compatibility aliases
  'minimalist': MinimalUniversalTemplate,
  'creative': FrontendProTemplate,
  'corporate': CreativeStudioTemplate,
  'data-science': AIMatrixTemplate,
  'game-dev': PixelForgeTemplate,
  'student': MinimalUniversalTemplate,
  'devops': BackendCoreTemplate,
  'cyberpunk': DesignCanvasTemplate,
};

export const STREAM_TEMPLATE_MAP: Record<string, string> = {
  'Developer': 'developer-pro',
  'Graphic Designer': 'design-canvas',
  'Photographer': 'lens-craft',
};
