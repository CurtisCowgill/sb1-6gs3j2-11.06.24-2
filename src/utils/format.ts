import { format, parseISO } from 'date-fns';

export const formatDate = (date: string) => {
  return format(parseISO(date), 'MMM d, yyyy');
};

export const formatDateTime = (date: string) => {
  return format(parseISO(date), 'MMM d, yyyy h:mm a');
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
};