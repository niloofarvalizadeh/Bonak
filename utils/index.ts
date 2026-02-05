import { v4 as uuidv4 } from "uuid";
import {
  BuyerDashboardRoutes,
  MarketerDashboardRoutes,
  SellerDashboardRoutes
} from "@/constants/routes";
import { FilterRoutesByTagsProps, TicketType, Transaction } from "@/types";
import moment from "moment-jalaali";

/**
 * Filters and sorts routes based on the provided tags and user role.
 *
 * This function takes a set of tags and a user role, and filters the available
 * routes to include only those that match the specified tags. The resulting
 * routes are then sorted based on the order of the provided tags.
 *
 * @param {FilterRoutesByTagsProps} props - The properties containing tags and user role.
 * @param {string[]} props.tags - An array of tags to filter the routes by.
 * @param {string} props.userRole - The role of the user, which determines the set of routes to use.
 * @returns {RouteType[]} An array of filtered and sorted routes based on the provided tags.
 *
 * @example
 * const routes = filterRoutesByTags({ tags: ['dashboard', 'settings'], userRole: 'seller' });
 * console.log(routes); // Example output: [{ tag: 'dashboard', ... }, { tag: 'settings', ... }]
 */
export const filterRoutesByTags = (props: FilterRoutesByTagsProps) => {
  const { tags, userRole } = props;

  const filteredRoutes = (
    userRole === "seller"
      ? SellerDashboardRoutes
      : userRole == "buyer"
        ? BuyerDashboardRoutes
        : MarketerDashboardRoutes
  ).filter((route) => tags.includes(route.tag));

  const sortedRoutes = tags
    .map((tag) => filteredRoutes.find((route) => route.tag === tag))
    .filter((route) => route !== undefined);

  return sortedRoutes;
};

/**
 * Generates a random UUID (Universally Unique Identifier).
 *
 * This function utilizes the `uuid` library to create a version 4 UUID,
 * which is randomly generated and can be used as a unique identifier
 * for various purposes, such as database keys, session identifiers, etc.
 *
 * @returns {string} A randomly generated UUID as a string.
 *
 * @example
 * const id = generateRandomId();
 * console.log(id); // Example output: '550e8400-e29b-41d4-a716-446655440000'
 */
export const generateRandomId = (): string => {
  return uuidv4();
};

/**
 * Merges two arrays of tickets and sorts them by their creation date in descending order.
 *
 * This function takes two arrays of tickets (regular tickets and support tickets) and merges them into a single array.
 * It then sorts the merged array based on the `createdAt` property, ensuring that the most recently created tickets
 * appear first. If either of the loading states is true, an empty array is returned.
 *
 * @param {TicketType[]} tickets - An array of regular tickets to be merged.
 * @param {TicketType[]} supportTickets - An array of support tickets to be merged.
 * @param {boolean} isLoadingTickets - A boolean indicating if the regular tickets are currently loading.
 * @param {boolean} isLoadingSupportTickets - A boolean indicating if the support tickets are currently loading.
 * @returns {(TicketType & { userType: 'seller' | 'support' })[]} An array of merged and sorted tickets with userType. Returns an empty array if loading.
 *
 * @example
 * const tickets = [
 *   { id: 1, createdAt: '2023-10-01T10:00:00Z', user: 1, subject: 'Issue 1', status: 'open' },
 *   { id: 2, createdAt: '2023-10-02T12:00:00Z', user: 2, subject: 'Issue 2', status: 'in_progress' },
 * ];
 * const supportTickets = [
 *   { id: 3, createdAt: '2023-10-03T14:00:00Z', user: 3, subject: 'Support 1', status: 'answered' },
 *   { id: 4, createdAt: '2023-10-01T09:00:00Z', user: 4, subject: 'Support 2', status: 'closed' },
 * ];
 * const sortedTickets = mergeAndSortTickets(tickets, supportTickets, false, false);
 * console.log(sortedTickets);
 * // Example output: Array of tickets sorted by createdAt in descending order, each with userType.
 */
export const mergeAndSortTickets = (
  tickets: TicketType[],
  supportTickets: TicketType[],
  isLoadingTickets: boolean,
  isLoadingSupportTickets: boolean
): (TicketType & { userType: "seller" | "support" })[] => {
  if (isLoadingTickets || isLoadingSupportTickets) {
    return [];
  }

  const mergedTickets = [
    ...tickets.map((ticket) => ({ ...ticket, userType: "seller" as const })),
    ...supportTickets.map((ticket) => ({
      ...ticket,
      userType: "support" as const
    }))
  ];

  mergedTickets.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return mergedTickets;
};

/**
 * Handles the display logic for ticket statuses.
 *
 * This function takes a ticket status as input and performs actions based on the status.
 * The possible statuses are "open", "in_progress", "answered", and "closed".
 * Currently, the function does not perform any specific actions for each status.
 *
 * @param {"open" | "in_progress" | "answered" | "closed"} status - The status of the ticket.
 * @returns {void} This function does not return a value.
 *
 * @example
 * ticketStatusDisplayHandler("open"); // Call the function with the "open" status.
 */
export const ticketStatusDisplayHandler = (
  status: "open" | "in_progress" | "answered" | "closed"
) => {
  if (status == "open") {
    return "باز";
  } else if (status == "in_progress") {
    return "درحال‌بررسی";
  } else if (status == "answered") {
    return "پاسخ‌داده‌شده";
  } else if (status == "closed") {
    return "پاسخ‌داده‌شده";
  } else {
    return "درحال‌بررسی";
  }
};

/**
 * Converts a given date to the Jalali (Persian) calendar format.
 *
 * This function takes a date as input and formats it to the Jalali calendar
 * in the format 'YYYY/MM/DD'.
 *
 * @param {string | Date} date - The date to be converted, can be a string or Date object.
 * @returns {string} The formatted date in the Jalali calendar as 'YYYY/MM/DD'.
 *
 * @example
 * const jalaliDate = convertToJalaliDate('2024-03-10T00:00:00Z');
 * console.log(jalaliDate); // Example output: '1403/01/21'
 */
export const convertToJalaliDate = (date: Date): string => {
  return moment(date).format("jYYYY/jMM/jDD");
};

export const getWalletStatusText = (status: Transaction["status"]) => {
  switch (status) {
    case "pending_approval":
      return "در انتظار تأیید";
    case "rejected":
      return "رد شده";
    case "paid":
      return "پرداخت شده";
    case "approved":
      return "در انتظار پرداخت";
    default:
      return status;
  }
};

export const getWalletStatusLabelText = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    pending_approval: "در انتظار تأیید",
    rejected: "رد شده",
    paid: "واریز شده",
    approved: "تایید شده - در انتظار واریز"
  };
  return statusMap[status] || "نامشخص";
};

export const getStatusWalletColor = (status: string): string => {
  switch (status) {
    case "rejected":
      return "text-red-500";
    case "paid":
      return "text-green-500";
    case "pending_approval":
      return "text-yellow-500";
    case "approved":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

export const formatCardNumber = (cardNumber: string) => {
  return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
};

export const formatIbanNumber = (ibanNumber: string) => {
  const match = ibanNumber.match(/(.{4})(.{4})(.{4})(.{4})(.{4})(.{4})(.{4})/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]} ${match[6]} ${match[7]}`;
  }
  return ibanNumber;
};

export const productStatusMap: Record<string, string> = {
  pending: "در انتظار تایید",
  confirmed: "تایید شده",
  delivered: "تحویل داده شده",
  cancelled_by_buyer: "لغو شده (توسط خریدار)",
  cancelled_by_seller: "لغو شده (توسط فروشنده)"
};

export const productStatusColorMap: Record<string, string> = {
  pending: "text-yellow-500",
  confirmed: "text-green-500",
  delivered: "text-blue-500",
  cancelled_by_buyer: "text-red-500",
  cancelled_by_seller: "text-orange-500"
};
