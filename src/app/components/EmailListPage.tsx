import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { X, Mail } from 'lucide-react';

interface Subscription {
  key: string;
  value: {
    email: string;
    subscribedAt: string;
  };
}

export default function EmailListPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [addingEmail, setAddingEmail] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e1013b8c/subscriptions`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch subscriptions');
      }

      const data = await response.json();
      setSubscriptions(data.subscriptions || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const exportToCSV = () => {
    const csv = [
      ['Email', 'Subscribed At'],
      ...subscriptions.map(sub => [
        sub.value.email,
        sub.value.subscribedAt
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sleep-shop-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const addEmail = async () => {
    setAddingEmail(true);
    setAddSuccess(false);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e1013b8c/add-email`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: newEmail }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add email');
      }

      const data = await response.json();
      if (data.success) {
        setAddSuccess(true);
        fetchSubscriptions();
      } else {
        throw new Error(data.message || 'Failed to add email');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setAddingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif text-[#4A3D5C] mb-2">Email Subscribers</h1>
              <p className="text-[#666666]">
                Total subscribers: {subscribers.length}
              </p>
            </div>
            <button
              onClick={exportToCSV}
              className="px-6 py-3 bg-[#5D4E7A] text-white rounded-full hover:bg-[#796896] transition-colors shadow-lg shadow-[#5D4E7A]/20"
            >
              Export to CSV
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7AA8]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600">Error: {error}</p>
              <button
                onClick={fetchSubscriptions}
                className="mt-4 px-4 py-2 text-sm text-red-600 hover:text-red-700 underline"
              >
                Try again
              </button>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-16 w-16 text-[#CCCCCC] mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-[#999999] text-lg">No subscribers yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E5E5]">
                    <th className="text-left py-4 px-4 text-sm font-medium text-[#8B7AA8]">
                      Email Address
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-[#8B7AA8]">
                      Subscribed At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions
                    .sort((a, b) => 
                      new Date(b.value.subscribedAt).getTime() - 
                      new Date(a.value.subscribedAt).getTime()
                    )
                    .map((sub) => (
                      <tr
                        key={sub.key}
                        className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors"
                      >
                        <td className="py-4 px-4 text-[#333333]">
                          {sub.value.email}
                        </td>
                        <td className="py-4 px-4 text-[#666666] text-sm">
                          {formatDate(sub.value.subscribedAt)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Email Modal */}
      <div
        className={`fixed inset-0 z-50 ${
          showAddModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } transition-opacity`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-serif text-[#8B7AA8]">Add Email</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter email address"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addEmail}
                className="ml-4 px-4 py-2 bg-[#8B7AA8] text-white rounded-full hover:bg-[#9D8DBA] transition-colors"
                disabled={addingEmail}
              >
                {addingEmail ? 'Adding...' : 'Add Email'}
              </button>
            </div>
            {addSuccess && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-600">Email added successfully!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}