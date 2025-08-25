import { createFileRoute } from '@tanstack/react-router';
import { ApiTester } from '@/components/api-tester';

function HomePage() {
  return <ApiTester />;
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
