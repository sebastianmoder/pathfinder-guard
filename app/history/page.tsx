import { Header } from '@/components/layout/Header';
import { HistoryList } from '@/components/history/HistoryList';

export const metadata = {
  title: 'Session History | GUARD',
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-guard-bg">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold text-guard-blue-900 mb-2">Session History</h1>
        <p className="text-sm text-guard-blue-500 mb-8">
          Resume an unfinished session or review completed labs.
        </p>
        <HistoryList />
      </main>
    </div>
  );
}
