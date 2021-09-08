using Application.ViewModels;
using AutoMapper;
using Data.Entities;

namespace WebAPI.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterRequest, AppUser>();
            CreateMap<AppUser, UserResponse>();
        }
    }
}
