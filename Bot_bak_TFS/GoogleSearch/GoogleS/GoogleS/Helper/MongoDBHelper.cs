﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AISSystem;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoV2;
using GoogleS.Models;

namespace GoogleS
{
    public class MongoDBHelper:MDB
    {

        private static string conn = AppSettingHelper.GetAppSetting("mongoCon");
        
        private static string dbName = AppSettingHelper.GetAppSetting("mongoDB");


        public MongoDBHelper()
            : base(conn, dbName)
        {

        }

        public IMongoDatabase GetMongoDB()
        {
            return base.GetDb();
        }


        public static readonly MongoDBHelper Instance = new MongoDBHelper();

        public IMongoCollection<Dnl_Google_BaiduCommend> Get_Dnl_Google_BaiduCommend()
        {
            return base.GetCollection<Dnl_Google_BaiduCommend>("Dnl_Google_BaiduCommend");
        }


        public IMongoCollection<Dnl_Google_level1link> Get_Dnl_Google_level1link()
        {
            return base.GetCollection<Dnl_Google_level1link>("Dnl_Google_level1link");
        }

       

    }
    public class Person
    {
        public string name { get; set; }
        public ObjectId _id;
    }

}