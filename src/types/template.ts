
export interface TemplateComponent {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider' | 'spacer' | 'header' | 'footer' | 'grid' | 'card' | 'list' | 'quote' | 'video' | 'icon' | 'testimonial';
  content: string;
  link?: string; // For buttons and other clickable elements
  gridColumns?: number; // For grid layouts
  gridItems?: TemplateComponent[]; // For grid containers
  styles: {
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right';
    fontWeight?: string;
    borderRadius?: string;
    width?: string;
    height?: string;
    border?: string;
    margin?: string;
    boxShadow?: string;
  };
}

export interface Template {
  id: string;
  name: string;
  components: TemplateComponent[];
  createdAt: string;
  updatedAt: string;
}
