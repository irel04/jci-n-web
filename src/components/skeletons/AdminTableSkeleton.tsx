import { TableRow, TableCell } from "@/components/ui/table"

const AdminTableSkeleton = () => {
  return (
	Array.from({ length: 5 }).map((_, index) => (
		<TableRow key={index} className="animate-pulse">
			{Array.from({ length: 8 }).map((__, cellIndex) => (
				<TableCell key={cellIndex}>
					<div className="h-4 w-full bg-gray-300 rounded"></div>
				</TableCell>
			))}
		</TableRow>
	))
  )
}

export default AdminTableSkeleton