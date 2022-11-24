using InterviewTest.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;

namespace InterviewTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeesController : ControllerBase
    {
        [HttpGet]
        public List<Employee> Get()
        {
            var employees = new List<Employee>();

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"SELECT Id, Name, Value FROM Employees";
                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        employees.Add(new Employee
                        {
                            Id = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Value = reader.GetInt32(2)
                        });
                    }
                }
                connection.Close();
            }

            return employees;
        }

        [HttpGet("/[controller]/{id}")]
        public Employee Get(int id)
        {
            var employee = new Employee();

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"SELECT Id, Name, Value FROM Employees WHERE Id = " + id;
                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        employee.Id = reader.GetInt32(0);
                        employee.Name = reader.GetString(1);
                        employee.Value = reader.GetInt32(2);
                    }
                }
                connection.Close();
            }

            return employee;
        }

        [HttpPost]
        public void Insert(Employee employee)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var insertCmd = connection.CreateCommand();
                insertCmd.CommandText = @"INSERT INTO Employees(Name, Value) VALUES ('" + employee.Name + "', " + employee.Value + ")";
                insertCmd.ExecuteNonQuery();

                connection.Close();
            }

            //return employee;
        }

        [HttpPatch("/[Controller]/{id}")]
        public Employee Update(int id, Employee employee)
        {
            Employee existingEmployee = Get(id);

            if (existingEmployee.Id > 0)
            {
                if (employee.Name != null || employee.Name != "")
                {
                    existingEmployee.Name = employee.Name;
                }
                existingEmployee.Value = employee.Value;

                var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
                using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
                {
                    connection.Open();

                    var updateCmd = connection.CreateCommand();
                    updateCmd.CommandText = @"UPDATE Employees SET Name = '" + existingEmployee.Name + "', Value = " + existingEmployee.Value + " WHERE Id = " + id;
                    updateCmd.ExecuteNonQuery();

                    connection.Close();
                }
                return existingEmployee;

            }
            else
            {
                throw new Exception("Employee Not Found");
            }
        }

        [HttpDelete("/[Controller]/{id}")]
        public void Delete(int id)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var updateCmd = connection.CreateCommand();
                updateCmd.CommandText = @"DELETE FROM Employees WHERE Id = " + id;
                updateCmd.ExecuteNonQuery();

                connection.Close();
            }
        }
    }

}
