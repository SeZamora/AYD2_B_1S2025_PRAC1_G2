import { BrowserRouter } from 'react-router-dom';
import { PageRoutes } from '../pages/routes/PageRoutes'; // Importas el componente de rutas

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
};
