import { createFileRoute } from '@tanstack/react-router';
import { UsersList } from '@/components/users-list';

function HomePage() {
  return <UsersList />;
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
