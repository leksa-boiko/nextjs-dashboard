// import { customers } from '@/app/lib/placeholder-data';
import { Metadata } from 'next';
import Pagination from '@/app/ui/invoices/pagination';
import CustomersTable from '@/app/ui/customers/table';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchFilteredCustomers, fetchCustomersPages } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const [customers, totalPages] = await Promise.all([
    fetchFilteredCustomers(query, currentPage),
    fetchCustomersPages(query),
  ]);

  return (
    <div className="w-full">
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
