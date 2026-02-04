"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { 
  User as UserIcon, Mail, Phone, Store, ShieldCheck, ShieldAlert, 
  CheckCircle2, Ban, UserCheck, Calendar, Crown, Zap
} from "lucide-react";
import { Provider, UserRole } from "../../app/types/provider"; 
import { updateUserStatusAction } from "@/actions/admin.action"; 

interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phoneNumber: string | null;
  status: "ACTIVE" | "BANNED";
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  providerProfile: Provider | null;
}

interface UserManagementProps {
  initialUsers: IUser[];
  currentUserEmail?: string;
  currentUserRole?: UserRole;
}

export default function UserManagement({ 
  initialUsers = [], 
  currentUserEmail,
  currentUserRole 
}: UserManagementProps) {
  // Ensure initialUsers is always an array
  const safeInitialUsers = Array.isArray(initialUsers) ? initialUsers : [];
  
  const [users, setUsers] = useState<IUser[]>(safeInitialUsers);
  const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "BANNED">("ALL");

  const handleStatusChange = async (userId: string, currentStatus: "ACTIVE" | "BANNED") => {
    const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
    const toastId = toast.loading(`Updating status...`);

    try {
      const result = await updateUserStatusAction(userId, newStatus);

      if (!result.success) {
        toast.error(result.message, { id: toastId });
        return;
      }

      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, status: newStatus as "ACTIVE" | "BANNED" } : u));
      toast.success(`User is now ${newStatus}`, { id: toastId });
    } catch (error) {
      console.error("Status change error:", error);
      toast.error("An unexpected error occurred", { id: toastId });
    }
  };

  const filteredUsers = users.filter(user => {
    if (filter === "ALL") return true;
    return user.status === filter;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "ACTIVE").length,
    banned: users.filter(u => u.status === "BANNED").length,
    admins: users.filter(u => u.role === "ADMIN").length,
    providers: users.filter(u => u.role === "PROVIDER").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <ShieldCheck className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">User Control Center</h1>
              <p className="text-slate-500 font-semibold mt-1">Manage permissions, roles & account statuses</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 hover:border-orange-500 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <UserIcon className="text-slate-400" size={20} />
              <span className="text-2xl font-black text-slate-900">{stats.total}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Users</p>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-2xl p-5 hover:border-green-500 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="text-green-500" size={20} />
              <span className="text-2xl font-black text-green-600">{stats.active}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active</p>
          </div>

          <div className="bg-white border-2 border-red-200 rounded-2xl p-5 hover:border-red-500 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Ban className="text-red-500" size={20} />
              <span className="text-2xl font-black text-red-600">{stats.banned}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Banned</p>
          </div>

          <div className="bg-white border-2 border-indigo-200 rounded-2xl p-5 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Crown className="text-indigo-500" size={20} />
              <span className="text-2xl font-black text-indigo-600">{stats.admins}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Admins</p>
          </div>

          <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 hover:border-orange-500 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Store className="text-orange-500" size={20} />
              <span className="text-2xl font-black text-orange-600">{stats.providers}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Providers</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(["ALL", "ACTIVE", "BANNED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                filter === status
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-white text-slate-500 border-2 border-slate-200 hover:border-orange-500"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Users Table */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left py-5 px-6 text-xs font-black uppercase tracking-widest">User</th>
                  <th className="text-left py-5 px-6 text-xs font-black uppercase tracking-widest">Contact</th>
                  <th className="text-left py-5 px-6 text-xs font-black uppercase tracking-widest">Role</th>
                  <th className="text-left py-5 px-6 text-xs font-black uppercase tracking-widest">Business</th>
                  <th className="text-center py-5 px-6 text-xs font-black uppercase tracking-widest">Status</th>
                  <th className="text-center py-5 px-6 text-xs font-black uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100">
                {filteredUsers.map((user) => {
                  const isSelf = user.email === currentUserEmail;
                  const isAdminProfile = user.role === "ADMIN";
                  const isDisabled = isSelf || (currentUserRole === "ADMIN" && isAdminProfile);

                  return (
                    <tr 
                      key={user.id} 
                      className={`hover:bg-orange-50/50 transition-all duration-200 ${
                        isSelf ? 'bg-orange-50/30' : ''
                      }`}
                    >
                      {/* User Info */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-lg ${
                            user.role === 'ADMIN' 
                              ? 'bg-gradient-to-br from-indigo-500 to-indigo-600' 
                              : user.role === 'PROVIDER'
                              ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                              : 'bg-gradient-to-br from-slate-500 to-slate-600'
                          }`}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-slate-900">{user.name}</p>
                              {isSelf && (
                                <span className="bg-orange-500 text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase">
                                  You
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 font-medium">ID: {user.id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-5 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-slate-400" />
                            <p className="text-xs font-semibold text-slate-700">{user.email}</p>
                          </div>
                          {user.phoneNumber && (
                            <div className="flex items-center gap-2">
                              <Phone size={14} className="text-slate-400" />
                              <p className="text-xs font-semibold text-slate-700">{user.phoneNumber}</p>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-5 px-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black uppercase ${
                          user.role === 'ADMIN' 
                            ? 'bg-indigo-100 text-indigo-700' 
                            : user.role === 'PROVIDER'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {user.role === 'ADMIN' ? <Crown size={14} /> : user.role === 'PROVIDER' ? <Store size={14} /> : <UserIcon size={14} />}
                          {user.role}
                        </div>
                      </td>

                      {/* Business */}
                      <td className="py-5 px-6">
                        {user.providerProfile ? (
                          <div className="max-w-xs">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {user.providerProfile.businessName}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                              Provider Account
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6 text-center">
                        <div className="flex justify-center">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                            user.status === 'ACTIVE' 
                              ? 'bg-green-100 text-green-700 border-2 border-green-200' 
                              : 'bg-red-100 text-red-700 border-2 border-red-200'
                          }`}>
                            {user.status === 'ACTIVE' ? <Zap size={12} /> : <Ban size={12} />}
                            {user.status}
                          </div>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-5 px-6 text-center">
                        {isDisabled ? (
                          <div className="flex justify-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-slate-400 text-xs font-bold cursor-not-allowed">
                              <ShieldCheck size={14} />
                              Protected
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleStatusChange(user.id, user.status)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 ${
                              user.status === 'ACTIVE' 
                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700' 
                                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                            }`}
                          >
                            {user.status === 'ACTIVE' ? (
                              <span className="flex items-center gap-2">
                                <Ban size={14} /> Ban User
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                <UserCheck size={14} /> Activate
                              </span>
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <UserIcon className="text-slate-400" size={32} />
              </div>
              <p className="text-slate-500 font-bold text-lg">No users found</p>
              <p className="text-slate-400 text-sm font-medium mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-slate-50 border-2 border-orange-200 rounded-2xl">
          <div className="flex items-start gap-3">
            <ShieldAlert className="text-orange-600 mt-0.5" size={20} />
            <div>
              <p className="text-sm font-bold text-slate-900 mb-1">Security Notice</p>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Admin profiles are automatically protected and cannot be modified. 
                You cannot change your own account status. All actions are logged for security purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}