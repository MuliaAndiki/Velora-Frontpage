interface ToastProps {
  title: string;
  message: string;
  icon?: 'success' | 'error' | 'warning' | 'info';
}

export const useAlert = () => {
  const toast = ({ title, message, icon = 'info' }: ToastProps) => {
    // Implement your toast logic here
    console.log(`${icon}: ${title} - ${message}`);
  };

  return { toast };
};
