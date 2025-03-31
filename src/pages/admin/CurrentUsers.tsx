import EditUser from "@/components/EditUser"
import AdminTableSkeleton from "@/components/skeletons/AdminTableSkeleton"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { TCompleteProfile } from "@/types"
import supabase from "@/utils/supabase"
import { useEffect, useState } from "react"


const tableHeader = [
  "ID Number",
  "Name",
  "Birthday",
  "Email Address",
  "Address",
  "Phone Number",
  "RFID",
  "Status",
  "Created at"
]

const CurrentUsers = () => {

  const [users, setUsers] = useState<TCompleteProfile[] | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [userId, setUserId] = useState<string  | null>()

  const fetchUsers = async () => {
    try {

      const { data, error } = await supabase.from("users_details").select("*").neq("status", "onboarding").eq("is_admin", false).order("created_at", { ascending: false })

      if (error) throw error

      setUsers(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {

    
    const channels = supabase.channel('admin-listening')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users_details' },
        () => {
          fetchUsers()
        }
      )
      .subscribe()

    return () => {
      channels.unsubscribe()
    }

  }, [])

  const handleOpenUserDetail = (id: string) => {
    setIsOpen(true)
    setUserId(id)
  }

  const handleCloseUserDetail = () => {
    setIsOpen(false)
    setUserId(null)
  }



  return (
    <>
      {/* Header */}
      <h1 className="hidden lg:block text-neutral-500 text-xl"> Admin / Current Users </h1>
      {users?.length === 0 ? <div className="flex-1 flex justify-center items-center flex-col gap-2">
        <h3 className="text-sm md:text-lg">Hey Admin! Nice to see you again</h3>
        <p className="text-xs md:text-sm lg:text-base text-center">There is no current active user right now</p>
      </div> : <div className="max-w-full overflow-hidden mt-4  h-full flex">
        <Table className=" flex-1 w-max">
          <TableHeader className="bg-brand-700 ">
            <TableRow>
              {tableHeader.map((name) => {
                return <TableHead className={`font-bold w-56 text-white`}>{name}</TableHead>
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users ? users.map((user, index) => {
              return (
                <TableRow key={index} className="cursor-pointer" onClick={() => handleOpenUserDetail(user.id ?? "")}>
                  <TableCell className="font-medium">{user.personal_id}</TableCell>
                  <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                  <TableCell>{user.birthdate}</TableCell>
                  <TableCell>{user.email_address}</TableCell>
                  <TableCell>{user.address ?? "N/A"}</TableCell>
                  <TableCell>{user.phone_number}</TableCell>
                  <TableCell>{user.RFID ?? "No RFID"}</TableCell>
                  <TableCell className="font-semibold">{user.status}</TableCell>
                  <TableCell>{user.created_at}</TableCell>
                </TableRow>
              )
            }) : <AdminTableSkeleton />}

          </TableBody>
        </Table>
      </div>}

      {users && users.length !==0 && userId && <EditUser isOpen={isOpen} onClose={handleCloseUserDetail} userData={users.filter(item => item.id === userId)[0]}/>}
    </>
  )
}

export default CurrentUsers