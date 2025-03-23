// app/(dashboard)/dashboard/quickbooks/components/AccountInformation.tsx
'use client';

import { Building, Mail, MapPin, User } from 'lucide-react';

interface AccountInformationProps {
  customer: {
    DisplayName: string;
    BillAddr?: {
      Line1?: string;
      City?: string;
      CountrySubDivisionCode?: string;
      PostalCode?: string;
    };
    PrimaryEmailAddr?: {
      Address?: string;
    };
  };
}

export function AccountInformation({ customer }: AccountInformationProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Account Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow pb-4">
          {/* Company Name - Blue */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="bg-blue-500 text-white rounded-full p-2 mr-3">
                <Building className="h-5 w-5" />
              </div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold">Company Name</h3>
            </div>
            <p className="ml-10 text-gray-900 dark:text-gray-100 font-medium">
              {customer.DisplayName}
            </p>
          </div>
          
          {/* Billing Address - Purple */}
          {customer.BillAddr && (
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-purple-500 text-white rounded-full p-2 mr-3">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 font-semibold">Billing Address</h3>
              </div>
              <div className="ml-10 space-y-1">
                {customer.BillAddr.Line1 && (
                  <p className="text-gray-900 dark:text-gray-100">{customer.BillAddr.Line1}</p>
                )}
                {(customer.BillAddr.City || customer.BillAddr.CountrySubDivisionCode || customer.BillAddr.PostalCode) && (
                  <p className="text-gray-900 dark:text-gray-100">
                    {customer.BillAddr.City}{customer.BillAddr.City && customer.BillAddr.CountrySubDivisionCode && ', '}
                    {customer.BillAddr.CountrySubDivisionCode}{' '}
                    {customer.BillAddr.PostalCode}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Email Address - Green */}
          {customer.PrimaryEmailAddr?.Address && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-green-500 text-white rounded-full p-2 mr-3">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 font-semibold">Email Address</h3>
              </div>
              <p className="ml-10 text-gray-900 dark:text-gray-100 font-medium">
                {customer.PrimaryEmailAddr.Address}
              </p>
            </div>
          )}

          {/* Account Manager - Orange */}
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="bg-orange-500 text-white rounded-full p-2 mr-3">
                <User className="h-5 w-5" />
              </div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold">Account Manager</h3>
            </div>
            <p className="ml-10 text-gray-900 dark:text-gray-100 font-medium">
              Sarah Johnson
            </p>
            <p className="ml-10 text-gray-600 dark:text-gray-400 text-sm">
              Last contact: March 12, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}