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

export const templateMap: Record<string, ComponentType<{ data: any }>> = {
  // New templates
  'minimal-universal': MinimalUniversalTemplate,
  'frontend-pro': FrontendProTemplate,
  'fullstack-nexus': FullStackNexusTemplate,
  'backend-core': BackendCoreTemplate,
  'ai-matrix': AIMatrixTemplate,
  'creative-studio': CreativeStudioTemplate,
  'design-canvas': DesignCanvasTemplate,
  'creative-motion': CreativeMotionTemplate,
  'pixel-forge': PixelForgeTemplate,

  // Backward compatibility aliases mapping to the new upgraded templates
  'minimalist': MinimalUniversalTemplate,
  'creative': FrontendProTemplate,
  'corporate': CreativeStudioTemplate,
  'data-science': AIMatrixTemplate,
  'game-dev': PixelForgeTemplate,
  'student': MinimalUniversalTemplate,
  'devops': BackendCoreTemplate,
  'cyberpunk': DesignCanvasTemplate, // Fallback to canvas
};
