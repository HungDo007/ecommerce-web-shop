using Application.ViewModels.Catalog;
using Application.ViewModels.System;
using AutoMapper;
using Data.Entities;
using System.Linq;

namespace WebAPI.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterRequest, AppUser>();

            CreateMap<AppUser, UserResponse>();

            CreateMap<Category, CategoryVm>()
                .ForMember(x => x.Parent, opt => opt.MapFrom(s => s.CatParent));

            CreateMap<CategoryVm, Category>();

            CreateMap<Product, ProductVm>()
                .ForMember(x => x.Seller, opt => opt.MapFrom(s => s.User.UserName))
                .ForMember(x => x.Image, opt => opt.MapFrom(s => s.ProductImages.Where(ss => ss.IsPoster == true).FirstOrDefault()));
        }
    }
}
