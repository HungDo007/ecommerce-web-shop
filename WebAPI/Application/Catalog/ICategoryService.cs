using Application.ViewModels.Catalog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Catalog
{
    public interface ICategoryService
    {
        /// <summary>
        /// Add new category.
        /// </summary>
        /// <param name="request"></param>
        /// <returns>true if add successed; otherwise, false.</returns>
        Task<bool> AddCat(CategoryVm request);


        /// <summary>
        /// Delete specified category.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>true if delete successed; otherwise, false.</returns>
        Task<bool> DeleteCat(int id);


        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns>true if add successed; otherwise, false.</returns>
        Task<bool> UpdateCat(CategoryVm request);

        /// <summary>
        /// Get all Category.
        /// </summary>
        /// <returns></returns>
        Task<List<CategoryVm>> GetAll();
    }
}
