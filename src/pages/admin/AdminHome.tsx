import AdminTableSkeleton from "@/components/skeletons/AdminTableSkeleton"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { TCompleteProfile } from "@/types"
import supabase from "@/utils/supabase"
import { useEffect, useState } from "react"


const tableHeader = [
  {
    name: "ID Number",
    width: null
  },
  {
    name: "Name",
    width: "w-56"
  },
  {
    name: "Birthday",
    width: null
  },
  {
    name: "Email Address",
    width: null
  },
  {
    name: "Address",
    width: "w-64"
  },
  {
    name: "Phone Number",
    width: null
  },
  {
    name: "RFID",
    width: null
  },
  {
    name: "Status",
    width: null
  }

]

const AdminHome = () => {

  const [users, setUsers] = useState<TCompleteProfile[] | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const { data, error } = await supabase.from("users_details").select("*").eq("status", "on-boarding")

        if (error) throw error

        setUsers(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [])



  return (
    <>
      {/* Header */}
      <h1 className="hidden lg:block text-neutral-500 text-xl"> Admin / On-Boarding </h1>
      {users?.length === 0 ? <div className="flex-1 flex justify-center items-center flex-col gap-2">
        <h3 className="text-sm md:text-lg">Hey Admin! Nice to see you again</h3>
        <p className="text-xs md:text-sm lg:text-base text-center">There is no current on-boarding user right now</p>
      </div> : <div className="max-w-full overflow-hidden mt-4  h-full flex">
        <Table className=" flex-1">
          <TableHeader className="bg-brand-700 ">
            <TableRow>
              {tableHeader.map(({ name, width }) => {
                return <TableHead className={`font-bold ${width ?? "w-48"} text-white`}>{name}</TableHead>
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users ? users.map((user, index) => {
              return (
                <TableRow key={index} className="cursor-pointer">
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                  <TableCell>{user.birthdate}</TableCell>
                  <TableCell>{user.email_address}</TableCell>
                  <TableCell>{user.address ?? "N/A"}</TableCell>
                  <TableCell>{user.phone_number}</TableCell>
                  <TableCell>{user.RFID ?? "No RFID"}</TableCell>
                  <TableCell className="font-semibold">{user.status}</TableCell>
                </TableRow>
              )
            }) : <AdminTableSkeleton />}

          </TableBody>
        </Table>
      </div>}
    </>
  )
}

export default AdminHome