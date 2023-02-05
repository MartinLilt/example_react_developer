export interface IModalInstance {
  toggleModal: (type: string) => void;
  modalTypes: { preview: string; delete: string };
}

export interface IFilePreview {
  preview: string;
  name: string;
  type: string;
}

export interface IDrawerWidth {
  drawerWidth: number;
}

export interface IModalComponent {
  modal: string | null;
  toggleModal: (type: string) => void;
  modalTypes: { preview: string; delete: string };
}

export interface IFileState {
  files: Array<any>;
  currentFile: Array<any>;
  isLoading: boolean;
  error: string;
}
