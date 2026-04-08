"use client";

import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { getProviderOrdersAction, updateOrderStatusAction } from "@/actions/order.action";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  Loader2, 
  User, 
  ReceiptText, 
  LayoutDashboard, 
  ShoppingBag, 
  MapPin, 
  CreditCard,
  Clock,
  ChefHat,
  Truck,
  CheckCircle,
  Filter,
  Search,
  MoreVertical,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderItem {
  quantity: number;
  meal: { name: string; price: number };
}

interface Order {
  id: string;
  orderNumber: string;
  totalAmount: number;
  deliveryAddress: string;
  status: "PENDING" | "CONFIRMED" | "COOKING" | "DELIVERED" | "CANCELLED";
  paymentStatus: string;
  createdAt: string;
  customer: { name: string; email?: string };
  items: OrderItem[];
}

export default function MyShopOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const statusOptions = ["PENDING", "CONFIRMED", "COOKING", "DELIVERED"];

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadOrders = useCallback(async () => {
    try {
      const data = await getProviderOrdersAction();
      setOrders(Array.isArray(data) ? data : []);
      setFilteredOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      setOrders([]);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      loadOrders();
    }
  }, [loadOrders, mounted]);

  useEffect(() => {
    let result = orders;
    
    // Apply status filter
    if (activeFilter !== "ALL") {
      result = result.filter(order => order.status === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.orderNumber.toLowerCase().includes(query) ||
        order.customer?.name?.toLowerCase().includes(query) ||
        order.deliveryAddress.toLowerCase().includes(query)
      );
    }
    
    setFilteredOrders(result);
  }, [searchQuery, activeFilter, orders]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await updateOrderStatusAction(orderId, newStatus);
      if (res.success) {
        toast.success("Status Updated", { 
          description: `Order #${orderId.slice(-4)} is now ${newStatus.toLowerCase()}`
        });
        await loadOrders();
      } else {
        toast.error("Update Failed", { description: res.message });
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "CONFIRMED": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "COOKING": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "DELIVERED": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "CANCELLED": return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-4 h-4" />;
      case "CONFIRMED": return <CheckCircle className="w-4 h-4" />;
      case "COOKING": return <ChefHat className="w-4 h-4" />;
      case "DELIVERED": return <Truck className="w-4 h-4" />;
      default: return null;
    }
  };

  const calculateStats = () => {
    const today = new Date().toDateString();
    const todayOrders = orders.filter(order => 
      new Date(order.createdAt).toDateString() === today
    );
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const todayRevenue = todayOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === "PENDING").length,
      cooking: orders.filter(o => o.status === "COOKING").length,
      today: todayOrders.length,
      totalRevenue,
      todayRevenue
    };
  };

  const stats = calculateStats();

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <LayoutDashboard className="w-4 h-4" />
              <span className="font-medium">Kitchen Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Order Management
            </h1>
            <p className="text-muted-foreground mt-2">Monitor and manage all incoming orders</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
              <ShoppingBag className="w-4 h-4" />
              New Orders ({stats.pending})
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="border-border shadow-md bg-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-auto md:flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search orders by ID, customer, or address..."
                  className="pl-10 w-full bg-background border-border placeholder:text-muted-foreground/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Tabs defaultValue="ALL" className="w-full" onValueChange={setActiveFilter}>
                  <TabsList className="bg-muted p-1">
                    <TabsTrigger value="ALL" className="data-[state=active]:bg-card text-xs">
                      All Orders
                    </TabsTrigger>
                    <TabsTrigger value="PENDING" className="data-[state=active]:bg-card text-xs">
                      Pending
                    </TabsTrigger>
                    <TabsTrigger value="COOKING" className="data-[state=active]:bg-card text-xs">
                      Cooking
                    </TabsTrigger>
                    <TabsTrigger value="DELIVERED" className="data-[state=active]:bg-card text-xs">
                      Delivered
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="border border-border shadow-lg overflow-hidden bg-card">
          <CardHeader className="bg-muted animate-in slide-in-from-top-2 duration-500">
            <CardTitle className="text-foreground flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-500" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="font-bold text-foreground/70 uppercase text-[10px] tracking-widest">Order Details</TableHead>
                    <TableHead className="font-bold text-foreground/70 uppercase text-[10px] tracking-widest">Customer</TableHead>
                    <TableHead className="font-bold text-foreground/70 uppercase text-[10px] tracking-widest">Items</TableHead>
                    <TableHead className="font-bold text-foreground/70 uppercase text-[10px] tracking-widest">Amount</TableHead>
                    <TableHead className="font-bold text-foreground/70 uppercase text-[10px] tracking-widest">Status</TableHead>
                    <TableHead className="font-bold text-foreground/70 uppercase text-[10px] tracking-widest text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Loader2 className="animate-spin w-8 h-8 text-orange-500 mb-4" />
                          <p className="text-muted-foreground">Loading orders...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64 text-center">
                        <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">No orders found</p>
                        {searchQuery && (
                          <p className="text-gray-400 text-sm mt-2">
                            Try adjusting your search or filter
                          </p>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-muted/30 transition-colors border-border">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <ReceiptText className="w-4 h-4 text-muted-foreground/50" />
                              <span className="font-bold text-foreground">
                                #{order.orderNumber}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {new Date(order.createdAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground/60 italic">
                              <CreditCard className="w-3 h-3" />
                              {order.paymentStatus}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground/50" />
                              <span className="font-bold text-foreground">
                                {order.customer?.name || "Guest"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground truncate max-w-[200px]">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{order.deliveryAddress}</span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {order.items?.slice(0, 3).map((item, idx) => (
                              <Badge 
                                key={idx} 
                                variant="secondary" 
                                className="bg-muted text-muted-foreground text-[10px] font-black uppercase px-2 py-1 rounded-md border border-border"
                              >
                                {item.quantity}x {item.meal?.name}
                              </Badge>
                            ))}
                            {order.items?.length > 3 && (
                              <Badge 
                                variant="secondary" 
                                className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-md"
                              >
                                +{order.items.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="font-bold text-foreground italic">
                            ${order.totalAmount.toFixed(2)}
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge 
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs border ${getStatusStyles(order.status)}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Select
                              disabled={updatingId === order.id}
                              onValueChange={(val: string) => handleStatusChange(order.id, val)}
                              defaultValue={order.status}
                            >
                              <SelectTrigger className="w-[140px] h-9 rounded-lg border-border bg-background">
                                <SelectValue placeholder="Update" />
                              </SelectTrigger>
                              <SelectContent className="rounded-lg border-border bg-card">
                                {statusOptions.map((opt) => (
                                  <SelectItem 
                                    key={opt} 
                                    value={opt}
                                    className="text-sm"
                                  >
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {updatingId === order.id && (
                              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-black uppercase tracking-widest text-muted-foreground border-t border-border pt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/20"></div>
              <span>Pending ({stats.pending})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm shadow-orange-500/20"></div>
              <span>Cooking ({stats.cooking})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/20"></div>
              <span>Delivered ({orders.filter(o => o.status === "DELIVERED").length})</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-black text-muted-foreground italic">
              Total Revenue: <span className="text-emerald-500 text-lg ml-2 not-italic">${stats.totalRevenue.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}