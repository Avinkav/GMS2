using System;
using Xunit;
using Moq;
using Microsoft.AspNetCore.Identity;
using GMS.Data;
using GMS.Data.Models;

namespace GMS2.UnitTests
{
    public class AccountTests
    {
        public AccountTests(){

        }

        [Fact]
        public void TestInvalidRegister()
        {
            var mockUserManager = new Mock<UserManager<AppUser>>();
            // mockUserManager.Setup(x => x.CreateAsync())
        }
    }
}
