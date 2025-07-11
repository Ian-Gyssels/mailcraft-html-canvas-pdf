import { 
  Type, Image, MousePointer, Minus, Space, Heading, AlignLeft, 
  Grid3x3, CreditCard, List, Quote, Video, Star, MessageSquare
} from 'lucide-react';

export interface ComponentConfig {
  id: string;
  icon: typeof Type;
  category: 'text' | 'media' | 'interactive' | 'layout' | 'content';
  hasContent: boolean;
  hasLink: boolean;
  hasGrid: boolean;
  defaultContent: string;
  styleProperties: string[];
}

export const componentConfigs: Record<string, ComponentConfig> = {
  header: {
    id: 'header',
    icon: Heading,
    category: 'text',
    hasContent: true,
    hasLink: false,
    hasGrid: false,
    defaultContent: 'Header Text',
    styleProperties: ['fontSize', 'color', 'backgroundColor', 'padding', 'textAlign', 'fontWeight', 'margin']
  },
  text: {
    id: 'text',
    icon: Type,
    category: 'text',
    hasContent: true,
    hasLink: false,
    hasGrid: false,
    defaultContent: 'Text content',
    styleProperties: ['fontSize', 'color', 'backgroundColor', 'padding', 'textAlign', 'fontWeight', 'margin']
  },
  quote: {
    id: 'quote',
    icon: Quote,
    category: 'text',
    hasContent: true,
    hasLink: false,
    hasGrid: false,
    defaultContent: 'Quote text',
    styleProperties: ['fontSize', 'color', 'backgroundColor', 'padding', 'textAlign', 'fontWeight', 'border', 'borderRadius', 'margin']
  },
  image: {
    id: 'image',
    icon: Image,
    category: 'media',
    hasContent: true,
    hasLink: true,
    hasGrid: false,
    defaultContent: 'https://via.placeholder.com/400x200',
    styleProperties: ['width', 'height', 'borderRadius', 'margin', 'border']
  },
  video: {
    id: 'video',
    icon: Video,
    category: 'media',
    hasContent: true,
    hasLink: false,
    hasGrid: false,
    defaultContent: '',
    styleProperties: ['width', 'height', 'borderRadius', 'margin']
  },
  button: {
    id: 'button',
    icon: MousePointer,
    category: 'interactive',
    hasContent: true,
    hasLink: true,
    hasGrid: false,
    defaultContent: 'Click me',
    styleProperties: ['fontSize', 'color', 'backgroundColor', 'padding', 'borderRadius', 'border', 'fontWeight', 'margin']
  },
  grid: {
    id: 'grid',
    icon: Grid3x3,
    category: 'layout',
    hasContent: false,
    hasLink: false,
    hasGrid: true,
    defaultContent: '',
    styleProperties: ['backgroundColor', 'padding', 'borderRadius', 'border', 'margin']
  },
  card: {
    id: 'card',
    icon: CreditCard,
    category: 'layout',
    hasContent: true,
    hasLink: true,
    hasGrid: false,
    defaultContent: 'Card content',
    styleProperties: ['backgroundColor', 'padding', 'borderRadius', 'border', 'margin', 'boxShadow']
  },
  list: {
    id: 'list',
    icon: List,
    category: 'content',
    hasContent: true,
    hasLink: false,
    hasGrid: false,
    defaultContent: 'Item 1\nItem 2\nItem 3',
    styleProperties: ['fontSize', 'color', 'backgroundColor', 'padding', 'margin']
  },
  testimonial: {
    id: 'testimonial',
    icon: MessageSquare,
    category: 'content',
    hasContent: true,
    hasLink: false,
    hasGrid: false,
    defaultContent: 'Customer testimonial',
    styleProperties: ['fontSize', 'color', 'backgroundColor', 'padding', 'textAlign', 'borderRadius', 'border', 'margin']
  },
  icon: {
    id: 'icon',
    icon: Star,
    category: 'content',
    hasContent: true,
    hasLink: false,
    hasGrid: false,
    defaultContent: 'star',
    styleProperties: ['color', 'margin']
  },
  divider: {
    id: 'divider',
    icon: Minus,
    category: 'layout',
    hasContent: false,
    hasLink: false,
    hasGrid: false,
    defaultContent: '',
    styleProperties: ['color', 'margin', 'height']
  },
  spacer: {
    id: 'spacer',
    icon: Space,
    category: 'layout',
    hasContent: false,
    hasLink: false,
    hasGrid: false,
    defaultContent: '',
    styleProperties: ['height', 'margin']
  },
  footer: {
    id: 'footer',
    icon: AlignLeft,
    category: 'text',
    hasContent: true,
    hasLink: false,
    hasGrid: false,
    defaultContent: 'Footer text',
    styleProperties: ['fontSize', 'color', 'backgroundColor', 'padding', 'textAlign', 'fontWeight', 'margin']
  }
};

export const categories = ['all', 'text', 'media', 'interactive', 'layout', 'content'] as const;