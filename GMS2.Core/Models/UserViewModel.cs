using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using GMS.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace GMS2.Core.Models
{
    public class UserViewModel
    {
        public UserViewModel()
        {
            User = new AppUser();
        }

        public UserViewModel(AppUser user)
        {
            User = user;
        }

        public AppUser User { get; }

        public Guid Id
        {
            get => User.Id;
            set => User.Id = value;
        }

        public string UserName
        {
            get => User.UserName;
            set => User.UserName = value;
        }

        public string FirstName
        {
            get => User.FirstName;
            set => User.FirstName = value;
        }

        public string LastName
        {
            get => User.LastName;
            set => User.LastName = value;
        }

        public string Email
        {
            get => User.Email;
            set => User.Email = value;
        }


        public string PhoneNumber
        {
            get => User.PhoneNumber;
            set => User.PhoneNumber = value;
        }

        public string AddressLine1
        {
            get => User.AddressLine1;
            set => User.AddressLine1 = value;
        }

        public string City
        {
            get => User.City;
            set => User.City = value;
        }

        public string State
        {
            get => User.State;
            set => User.State = value;
        }

        public int PostCode
        {
            get => User.PostCode;
            set => User.PostCode = value;
        }

        public DateTime dob
        {
            get => User.Dob;
            set => User.Dob = value;
        }

    }
}
