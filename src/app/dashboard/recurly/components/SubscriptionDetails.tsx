import React from "react";
import {
  CreditCard,
  Building,
  MapPin,
  Phone,
  Zap,
  Cloud,
  CloudLightning,
  Server,
  Calendar,
} from "lucide-react";

// Define TypeScript interfaces for our data structures
interface NodeDistribution {
  type: string;
  name: string;
  count: number;
  price: number;
}

interface Subscription {
  id: string;
  state: string;
  quantity: number;
  total: number;
  current_period_ends_at: string;
  canceled_at?: string;
  node_distribution?: NodeDistribution[];
}

interface PaymentMethod {
  card_type: string;
  last_four: string;
  exp_month: number; // Changed from string to number
  exp_year: number;  // Changed from string to number
}

interface Address {
  street1: string;
  street2?: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
  phone?: string;
}

interface BillingInfo {
  payment_method: PaymentMethod;
  first_name: string;
  last_name: string;
  address: Address;
}

interface SubscriptionDetailsProps {
  subscriptions: Subscription[];
  billingInfo: BillingInfo;
}

export function SubscriptionDetails({ subscriptions, billingInfo }: SubscriptionDetailsProps) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper to get node type icon
  const getNodeIcon = (nodeType: string) => {
    switch (nodeType) {
      case "flux":
        return <Zap className="h-4 w-4 text-white" />;
      case "cumulus":
        return <Cloud className="h-4 w-4 text-white" />;
      case "nimbus":
        return <CloudLightning className="h-4 w-4 text-white" />;
      case "r8":
        return <Server className="h-4 w-4 text-white" />;
      default:
        return <Server className="h-4 w-4 text-white" />;
    }
  };

  // Helper to get node type background color
  const getNodeColor = (nodeType: string): string => {
    switch (nodeType) {
      case "flux":
        return "bg-yellow-500 dark:bg-yellow-600";
      case "cumulus":
        return "bg-blue-500 dark:bg-blue-600";
      case "nimbus":
        return "bg-purple-500 dark:bg-purple-600";
      case "r8":
        return "bg-gray-500 dark:bg-gray-600";
      default:
        return "bg-gray-500 dark:bg-gray-600";
    }
  };

  // Helper to get node type background color for cards
  const getNodeBgColor = (nodeType: string): string => {
    switch (nodeType) {
      case "flux":
        return "bg-yellow-50 dark:bg-yellow-900/30";
      case "cumulus":
        return "bg-blue-50 dark:bg-blue-900/30";
      case "nimbus":
        return "bg-purple-50 dark:bg-purple-900/30";
      case "r8":
        return "bg-gray-50 dark:bg-gray-800/50";
      default:
        return "bg-gray-50 dark:bg-gray-800/50";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Node Subscription Details */}
      <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden h-full">
        <div className="p-6 flex flex-col h-full">
          {subscriptions.map((subscription: Subscription) => (
            <div key={subscription.id} className="space-y-6 flex-grow">
              <div className="flex justify-between items-center">
                {/* Title with improved contrast */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Node Rental Subscription
                </h2>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    subscription.state === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {subscription.state}
                </div>
              </div>

              {/* Node Distribution - Enhanced Style */}
              {subscription.node_distribution && (
                <div className="mt-3">
                  {/* Improved subtitle contrast */}
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Node Distribution
                  </h4>

                  {/* Node Type Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                    {subscription.node_distribution.map((node) => (
                      <div
                        key={node.type}
                        className={`${getNodeBgColor(
                          node.type
                        )} p-3 rounded-xl`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`${getNodeColor(
                              node.type
                            )} w-8 h-8 rounded-full flex items-center justify-center`}
                          >
                            {getNodeIcon(node.type)}
                          </div>
                          <div>
                            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                              {node.count}
                            </span>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {node.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Node Details Table - Updated with colored backgrounds */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 text-left border-b border-blue-100 dark:border-blue-800/30">
                            Node Type
                          </th>
                          <th className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 text-center border-b border-blue-100 dark:border-blue-800/30">
                            Count
                          </th>
                          <th className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 text-right border-b border-blue-100 dark:border-blue-800/30">
                            Price
                          </th>
                          <th className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 text-right border-b border-blue-100 dark:border-blue-800/30">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscription.node_distribution.map((node) => (
                          <tr key={`table-${node.type}`}>
                            {/* Fixed node name contrast */}
                            <td className="py-3 px-5 border-b border-blue-100 dark:border-blue-800/30">
                              <div className="flex items-center">
                                <div
                                  className={`${getNodeColor(
                                    node.type
                                  )} w-5 h-5 rounded-full flex items-center justify-center mr-3`}
                                >
                                  {getNodeIcon(node.type)}
                                </div>
                                <span className="text-gray-900 dark:text-gray-100">
                                  {node.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-5 text-gray-900 dark:text-gray-100 border-b border-blue-100 dark:border-blue-800/30 text-center">
                              {node.count}
                            </td>
                            <td className="py-3 px-5 text-gray-900 dark:text-gray-100 border-b border-blue-100 dark:border-blue-800/30 text-right">
                              ${node.price.toFixed(2)}/mo
                            </td>
                            <td className="py-3 px-5 font-medium text-gray-900 dark:text-gray-100 border-b border-blue-100 dark:border-blue-800/30 text-right">
                              ${(node.price * node.count).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-blue-100/50 dark:bg-blue-800/20">
                          <td
                            colSpan={3}
                            className="py-3 px-5 text-sm font-semibold text-gray-900 dark:text-gray-100 text-right"
                          >
                            Total Monthly Cost:
                          </td>
                          <td className="py-3 px-5 font-semibold text-gray-900 dark:text-gray-100 text-right">
                            ${subscription.total.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {subscription.canceled_at && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-300 text-sm">
                  Cancels on {formatDate(subscription.canceled_at)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Payment & Billing */}
      <div className="flex flex-col gap-6 h-full">
        {/* Payment & Billing Information */}
        <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden p-5">
          {/* Improved heading contrast */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Payment & Billing
          </h2>

          {/* Payment & Billing Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Payment Method */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="bg-blue-500 dark:bg-blue-600 text-white rounded-full p-2 mr-3">
                  <CreditCard className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                  Payment Method
                </h3>
              </div>
              <div className="ml-9">
                <p className="text-gray-900 dark:text-gray-100 font-medium text-sm">
                  {billingInfo.payment_method.card_type} ••••{" "}
                  {billingInfo.payment_method.last_four}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Expires {billingInfo.payment_method.exp_month}/
                  {billingInfo.payment_method.exp_year}
                </p>
              </div>
            </div>

            {/* Billing Contact */}
            <div className="bg-gray-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="bg-indigo-500 dark:bg-indigo-600 text-white rounded-full p-2 mr-3">
                  <Building className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                  Billing Contact
                </h3>
              </div>
              <div className="ml-9">
                <p className="text-gray-900 dark:text-gray-100 font-medium text-sm">
                  {billingInfo.first_name} {billingInfo.last_name}
                </p>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="bg-teal-500 dark:bg-teal-600 text-white rounded-full p-2 mr-3">
                  <MapPin className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                  Billing Address
                </h3>
              </div>
              <div className="ml-9 space-y-0.5">
                <p className="text-gray-900 dark:text-gray-100 text-sm">
                  {billingInfo.address.street1}
                </p>
                {billingInfo.address.street2 && (
                  <p className="text-gray-900 dark:text-gray-100 text-sm">
                    {billingInfo.address.street2}
                  </p>
                )}
                <p className="text-gray-900 dark:text-gray-100 text-sm">
                  {billingInfo.address.city}, {billingInfo.address.region}{" "}
                  {billingInfo.address.postal_code}
                </p>
                <p className="text-gray-900 dark:text-gray-100 text-sm">
                  {billingInfo.address.country}
                </p>
              </div>
            </div>

            {/* Phone */}
            {billingInfo.address.phone && (
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="bg-amber-500 dark:bg-amber-600 text-white rounded-full p-2 mr-3">
                    <Phone className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Phone</h3>
                </div>
                <div className="ml-9">
                  <p className="text-gray-900 dark:text-gray-100 font-medium text-sm">
                    {billingInfo.address.phone}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Subscription Usage Details */}
        <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm overflow-hidden p-5 flex-grow">
          {/* Improved heading contrast */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Subscription Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {subscriptions.map((subscription: Subscription) => (
              <React.Fragment key={`usage-${subscription.id}`}>
                {/* Total Nodes */}
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <div className="flex items-center mb-1.5">
                    <div className="bg-green-500 dark:bg-green-600 text-white rounded-full p-1.5 mr-2">
                      <Server className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      Total Nodes
                    </h3>
                  </div>
                  <p className="ml-8 font-semibold text-gray-900 dark:text-gray-100">
                    {subscription.quantity} nodes
                  </p>
                </div>

                {/* Total Monthly */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <div className="flex items-center mb-1.5">
                    <div className="bg-blue-500 dark:bg-blue-600 text-white rounded-full p-1.5 mr-2">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      Total Monthly
                    </h3>
                  </div>
                  <p className="ml-8 font-semibold text-gray-900 dark:text-gray-100">
                    ${subscription.total.toFixed(2)}
                  </p>
                </div>

                {/* Next Billing Date */}
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                  <div className="flex items-center mb-1.5">
                    <div className="bg-purple-500 dark:bg-purple-600 text-white rounded-full p-1.5 mr-2">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      Next Billing Date
                    </h3>
                  </div>
                  <p className="ml-8 font-semibold text-gray-900 dark:text-gray-100">
                    {formatDate(subscription.current_period_ends_at)}
                  </p>
                </div>

                {/* Billing Cycle */}
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                  <div className="flex items-center mb-1.5">
                    <div className="bg-orange-500 dark:bg-orange-600 text-white rounded-full p-1.5 mr-2">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      Billing Cycle
                    </h3>
                  </div>
                  <p className="ml-8 font-semibold text-gray-900 dark:text-gray-100">Monthly</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionDetails;