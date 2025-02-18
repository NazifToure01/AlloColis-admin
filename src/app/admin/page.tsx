export default function AdminPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8'>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
      <p className='text-lg mb-8'>
        Manage your application settings and data here.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='border p-4 rounded shadow'>
          <h2 className='font-semibold'>User Management</h2>
          <p>Manage users, roles, and permissions.</p>
          <button className='mt-2 bg-blue-500 text-white py-2 px-4 rounded'>
            Go to User Management
          </button>
        </div>
        <div className='border p-4 rounded shadow'>
          <h2 className='font-semibold'>Data Reports</h2>
          <p>View and generate reports based on application data.</p>
          <button className='mt-2 bg-blue-500 text-white py-2 px-4 rounded'>
            View Reports
          </button>
        </div>
        <div className='border p-4 rounded shadow'>
          <h2 className='font-semibold'>Settings</h2>
          <p>Configure application settings and preferences.</p>
          <button className='mt-2 bg-blue-500 text-white py-2 px-4 rounded'>
            Go to Settings
          </button>
        </div>
        <div className='border p-4 rounded shadow'>
          <h2 className='font-semibold'>Analytics</h2>
          <p>View application analytics and performance metrics.</p>
          <button className='mt-2 bg-blue-500 text-white py-2 px-4 rounded'>
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
