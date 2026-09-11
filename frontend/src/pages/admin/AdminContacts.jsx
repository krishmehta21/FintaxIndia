import React, { useEffect, useState } from 'react';
import { adminApi } from '../../adminApi';
import { Spinner } from '../../components/Spinner';
import { Mail, Phone } from 'lucide-react';

export const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await adminApi.getContactSubmissions();
        setContacts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Contact Submissions</h1>

      {loading ? (
        <Spinner size={40} className="mt-12" />
      ) : (
        <div className="flex flex-col gap-4">
          {contacts.map(contact => (
            <div key={contact.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-primary">{contact.name}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-accent">
                      <Mail size={14} /> {contact.email}
                    </a>
                    {contact.phone && (
                      <a href={`tel:${contact.phone}`} className="flex items-center gap-1 hover:text-accent">
                        <Phone size={14} /> {contact.phone}
                      </a>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{new Date(contact.created_at).toLocaleString()}</p>
                  {contact.service_interest && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded border border-blue-100">
                      Interest: {contact.service_interest}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>
          ))}
          {contacts.length === 0 && (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
              <p className="text-gray-500">No contact submissions found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
