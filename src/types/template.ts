
export interface TemplateComponent {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider' | 'spacer' | 'header' | 'footer';
  content: string;
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
  };
}

export interface Template {
  id: string;
  name: string;
  components: TemplateComponent[];
  createdAt: string;
  updatedAt: string;
}
