import UserManagement from "@/components/dashboard/UserManagement";
import { userService } from "@/service/user.service";

export default async function UsersPage() {
  
  const response = await userService.getAllUsers();
  console.log("Users Response:", response);
  

  let users = [];
  
  if (response?.data?.data && Array.isArray(response.data.data)) {
    users = response.data.data;
  } else if (response?.data && Array.isArray(response.data)) {
    users = response.data;
  } else if (Array.isArray(response)) {
    users = response;
  }
  
  console.log("Parsed Users Array:", users);

 
  const session = await userService.getSession();
  console.log("Current Session:", session);

  const currentUserEmail = session?.user?.email;
  const currentUserRole = session?.user?.role;

  return (
    <div className="w-full h-full bg-slate-50/30">
      <UserManagement 
        initialUsers={users}
        currentUserEmail={currentUserEmail}
        currentUserRole={currentUserRole}
      />
    </div>
  );
}