import { I18nProvider } from '@/i18n/I18nContext';
import { RouterProvider, useRouter } from '@/router/Router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { DoctorsListPage } from '@/pages/DoctorsListPage';
import { DoctorProfilePage } from '@/pages/DoctorProfilePage';
import { BookingPage } from '@/pages/BookingPage';
import { DataProtectionPage } from '@/pages/DataProtectionPage';

function Pages() {
  const { route } = useRouter();

  switch (route.name) {
    case 'home':
      return <HomePage />;
    case 'doctors':
      return <DoctorsListPage />;
    case 'doctor':
      return <DoctorProfilePage doctorId={route.id} />;
    case 'booking':
      return (
        <BookingPage
          doctorId={route.doctorId}
          initialDate={route.date}
          initialTime={route.time}
        />
      );
    case 'data-protection':
      return <DataProtectionPage />;
    default:
      return <HomePage />;
  }
}

function App() {
  return (
    <I18nProvider>
      <RouterProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Pages />
          </main>
          <Footer />
        </div>
      </RouterProvider>
    </I18nProvider>
  );
}

export default App;
