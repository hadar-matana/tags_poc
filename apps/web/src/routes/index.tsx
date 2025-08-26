import { createFileRoute } from '@tanstack/react-router';
import { ApiTester } from '@/components/api-tester';
import { ImageDemo } from '@/components/image-demo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@zohan/ui/tabs';
import { ImageIcon, TestTube } from 'lucide-react';

function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="api-tester" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="api-tester" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            API Tester
          </TabsTrigger>
          <TabsTrigger value="image-demo" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Image Service Demo
          </TabsTrigger>
        </TabsList>
        <TabsContent value="api-tester">
          <ApiTester />
        </TabsContent>
        <TabsContent value="image-demo">
          <ImageDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
