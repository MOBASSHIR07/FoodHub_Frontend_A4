import { getAllOrdersAction } from "@/actions/order.action";
import OrderHistoryTable from "@/components/admin/OrderHistoryTable";


export default async function OrderHistoryPage() {
  const orders = await getAllOrdersAction({ limit: 15 });

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="max-w-[1400px] mx-auto border-b border-slate-100 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            Order <span className="text-orange-500">Flux.</span>
          </h1>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1">
            System Operations / Worldwide Registry
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white border border-slate-100 px-5 py-3 rounded-2xl flex flex-col justify-center">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Efficiency</span>
            <span className="text-xl font-black text-emerald-500 tracking-tighter">98.4%</span>
          </div>
        </div>
      </div>

      <OrderHistoryTable orders={orders || []} />
    </div>
  );
}