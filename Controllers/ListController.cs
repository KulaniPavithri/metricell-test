using InterviewTest.Model;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;

namespace InterviewTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListController : ControllerBase
    {
        EmployeesController employeesController;
        public ListController()
        {
            employeesController = new EmployeesController();
        }

        /*
         * List API methods goe here
         * */

        [HttpGet("/[controller]/increment")]
        public List<Employee> GetEmployeesWithIncrementedValues()
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                String sqlUpdate = @"UPDATE Employees SET Value = Value + " + 1 + " WHERE Name LIKE 'E%'; ";
                sqlUpdate = sqlUpdate + @"UPDATE Employees SET Value = Value + " + 10 + " WHERE Name LIKE 'G%'; ";
                sqlUpdate = sqlUpdate + @"UPDATE Employees SET Value = Value + " + 100 + " WHERE Name NOT LIKE 'E%' AND Name NOT LIKE 'G%'; ";

                var updateCmd = connection.CreateCommand();
                updateCmd.CommandText = sqlUpdate;
                updateCmd.ExecuteNonQuery();

                connection.Close();
            }

            return employeesController.Get();
        }

        [HttpGet("/[controller]/sum")]
        public List<ListData> GetSpecificEmployeesBasedOnSummation()
        {
            var dataList = new List<ListData>();
            int threshold = 11171;

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"SELECT SUM(Value) FROM Employees WHERE Name Like 'A%'";
                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        if (reader.GetInt32(0) >= threshold)
                        {
                            dataList.Add(new ListData
                            {
                                FirstLetter = "A",
                                TotalValue = reader.GetInt32(0)
                            });
                            
                        }
                    }
                }

                queryCmd.CommandText = @"SELECT SUM(Value) FROM Employees WHERE Name Like 'B%'";
                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        if (reader.GetInt32(0) >= threshold)
                        {
                            dataList.Add(new ListData
                            {
                                FirstLetter = "B",
                                TotalValue = reader.GetInt32(0)
                            });
                        }
                    }
                }

                queryCmd.CommandText = @"SELECT SUM(Value) FROM Employees WHERE Name Like 'C%'";
                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        if (reader.GetInt32(0) >= threshold)
                        {
                            dataList.Add(new ListData
                            {
                                FirstLetter = "C",
                                TotalValue = reader.GetInt32(0)
                            });
                        }
                    }
                }
                connection.Close();
            }

            return dataList;
        }

    }
}
