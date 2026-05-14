import {
  User,
  Bell,
  Shield,
} from 'lucide-react';

import PageHeader from '../components/PageHeader';

export default function Settings() {

  const settings = [
    {
      title: 'Profile Settings',
      icon: <User size={22} />,
    },

    {
      title: 'Notification Settings',
      icon: <Bell size={22} />,
    },

    {
      title: 'Security Settings',
      icon: <Shield size={22} />,
    },
  ];

  return (

    <div>

      <PageHeader
        title="Settings"
        subtitle="Manage your dashboard settings"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {settings.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition"
          >

            <div className="bg-blue-100 text-blue-600 w-fit p-4 rounded-2xl mb-5">

              {item.icon}

            </div>

            <h2 className="text-xl font-bold text-slate-800">
              {item.title}
            </h2>

            <p className="text-slate-500 mt-2">
              Configure your {item.title.toLowerCase()}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}