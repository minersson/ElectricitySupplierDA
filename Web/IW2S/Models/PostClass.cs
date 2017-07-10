﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using IWSData.Model;

namespace IW2S.Models
{
    /*HttpPost时使用的类*/

    /// <summary>
    /// 实体树Post类
    /// </summary>
    public class Post_Entity
    {
        public string Id { get; set; }
        public string UsrId { get; set; }
        public string ParentId { get; set; }
        public DateTime CreatedAt { get; set; }
        /// <summary>
        /// 实体名称，此时属性名为null
        /// </summary>
        public EntityAndVariant Entity { get; set; }
        /// <summary>
        /// 实体相关属性
        /// </summary>
        public List<AttrAndVariant> Attributes { get; set; }
        /// <summary>
        /// 图片位置
        /// </summary>
        public string PicUrl { get; set; }
    }

    /// <summary>
    /// 关键词插入POST类
    /// </summary>
    public class KeywordPost
    {
        public string user_id { get; set; }
        /// <summary>
        /// 关键词列表，多个用分号相连
        /// </summary>
        public string keywords { get; set; }
        /// <summary>
        /// 项目Id
        /// </summary>
        public string projectId { get; set; }
        /// <summary>
        /// 是否为推荐词
        /// </summary>
        public bool isCommend { get; set; }
        /// <summary>
        /// 归属词组Id
        /// </summary>
        public string cateId { get; set; }
        ///// <summary>
        ///// 搜索开始时间
        ///// </summary>
        //public string startTime { get; set; }
        ///// <summary>
        ///// 搜索结束时间
        ///// </summary>
        //public string endTime { get; set; }
    }

    /// <summary>
    /// 文字树前端往后台传递信息时使用类
    /// </summary>
    public class WordTreeInfo
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public string Keyword { get; set; }
    }
}