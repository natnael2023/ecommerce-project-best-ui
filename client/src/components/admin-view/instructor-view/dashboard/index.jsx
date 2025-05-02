// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { DollarSign, Users } from "lucide-react";

import PropTypes from "prop-types";

function InstructorDashboard() {
//   function calculateTotalStudentsAndProfit() {
//     const { totalStudents, totalProfit, studentList } = listOfCourses.reduce(
//       (acc, course) => {
//         const studentCount = course.students.length;
//         acc.totalStudents += studentCount;
//         acc.totalProfit += course.pricing * studentCount;

//         course.students.forEach((student) => {
//           acc.studentList.push({
//             courseTitle: course.title,
//             studentName: student.studentName,
//             studentEmail: student.studentEmail,
//           });
//         });

//         return acc;
//       },
//       {
//         totalStudents: 0,
//         totalProfit: 0,
//         studentList: [],
//       }
//     );

//     return {
//       totalProfit,
//       totalStudents,
//       studentList,
//     };
//   }

//   console.log(calculateTotalStudentsAndProfit());

//   const config = [
//     {
//       icon: Users,
//       label: "Total Students",
//       value: calculateTotalStudentsAndProfit().totalStudents,
//     },
//     {
//       icon: DollarSign,
//       label: "Total Revenue",
//       value: calculateTotalStudentsAndProfit().totalProfit,
//     },
//   ];

  return (
    <div className="p-4">
    {/* Grid for Cards */}
    <div className="grid grid-cols-1 md:grid-cols- gap-6 mb-8 text-[#2F4F4F]">
      {/* Card 1 */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h2 className="text-sm font-medium">Total Students</h2>
          <icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">120</div>
      </div>
  
      {/* Card 2 */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h2 className="text-sm font-medium">Total Courses</h2>
          <icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">15</div>
      </div>
    </div>
  
    {/* Students List Card */}
    <div className="bg-white shadow-md rounded-lg">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Students List</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Course Name</th>
              <th className="py-2 px-4 text-left">Student Name</th>
              <th className="py-2 px-4 text-left">Student Email</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row 1 */}
            <tr>
              <td className="py-2 px-4 border-b">Mathematics</td>
              <td className="py-2 px-4 border-b">John Doe</td>
              <td className="py-2 px-4 border-b">john@example.com</td>
            </tr>
            {/* Example Row 2 */}
            <tr>
              <td className="py-2 px-4 border-b">Science</td>
              <td className="py-2 px-4 border-b">Jane Smith</td>
              <td className="py-2 px-4 border-b">jane@example.com</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}

InstructorDashboard.propTypes = {
  listOfCourses: PropTypes.node.isRequired,  // Validate that 'listofCourses' is a valid React node and is required
};

export default InstructorDashboard;
