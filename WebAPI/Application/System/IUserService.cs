﻿using Application.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.System
{
    public interface IUserService
    {
        /// <summary>
        /// Return token for authenticate.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<string> Authenticate(LoginRequest request);


        /// <summary>
        /// Register new User.
        /// </summary>
        /// <param name="request"></param>
        /// <returns>null if register successed; otherwise, list error in process</returns>
        Task<List<string>> Register(RegisterRequest request);


        /// <summary>
        /// Update infomation User.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="request"></param>
        /// <returns>true if update successed; otherwise, false</returns>
        Task<bool> Update(string username, UserUpdateRequest request);


        /// <summary>
        /// Change email for specified user.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="email"></param>
        /// <returns>true if change successed; false if email is in use by another user.</returns>
        Task<bool> ChangeEmail(string username, string email);


        /// <summary>
        /// Return infomation of specified user.
        /// </summary>
        /// <param name="username"></param>
        /// <returns>null if username not exists</returns>
        Task<UserResponse> GetByName(string username);


        /// <summary>
        /// Return list infomation of user paged.
        /// </summary>
        /// <returns></returns>
        Task<List<UserResponse>> GetUserPaging();


        /// <summary>
        /// Send verify code for active email.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task ActiveMail(string email);
    }
}
