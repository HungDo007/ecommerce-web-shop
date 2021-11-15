using Application.ViewModels.Catalog;
using Application.ViewModels.System;
using AutoMapper;
using Data.Entities;
using System;
using System.Collections.Generic;
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
            CreateMap<CategoryRequest, Category>();

            CreateMap<Product, ProductVm>()
                .ForMember(x => x.Seller, opt => opt.MapFrom(s => s.User.UserName))
                .ForMember(x => x.Category, opt => opt.MapFrom(s => s.ProductCategories.Count > 0 ? s.ProductCategories[0].CategoryId : 0))
                .ForMember(x => x.Price, opt => opt.MapFrom(s => s.ProductDetails.Count > 0 ? s.ProductDetails[0].Price : 0))
                .ForMember(x => x.Poster, opt => opt.MapFrom(s => s.ProductImages.Where(ss => ss.IsPoster == true).FirstOrDefault()))
                .ForMember(x => x.Images, opt => opt.MapFrom(s => s.ProductImages.Where(ss => ss.IsPoster == false)));

            CreateMap<ProductDetail, ProductDetailVm>();

            CreateMap<ComponentDetail, ComponentDetailVm>()
                .ForMember(x => x.CompId, opt => opt.MapFrom(s => s.ComponentId))
                .ForMember(x => x.Type, opt => opt.MapFrom(s => s.Component.Name));

            CreateMap<ComponentRequest, Component>();
            CreateMap<Component, CompVm>();

            CreateMap<Component, CompAdminVm>();


        }
    }
}
