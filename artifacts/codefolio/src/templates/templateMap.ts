import MinimalistTemplate from './MinimalistTemplate';
import CyberpunkTemplate from './CyberpunkTemplate';
import CorporateTemplate from './CorporateTemplate';
import CreativeTemplate from './CreativeTemplate';
import DataScienceTemplate from './DataScienceTemplate';
import GameDevTemplate from './GameDevTemplate';
import StudentTemplate from './StudentTemplate';
import DevOpsTemplate from './DevOpsTemplate';

export const templateMap: Record<string, React.ComponentType<{ data: any }>> = {
  minimalist: MinimalistTemplate,
  cyberpunk: CyberpunkTemplate,
  corporate: CorporateTemplate,
  creative: CreativeTemplate,
  'data-science': DataScienceTemplate,
  'game-dev': GameDevTemplate,
  student: StudentTemplate,
  devops: DevOpsTemplate,
};
