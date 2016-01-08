package com.ts.DAO.inter.example;

import java.util.List;

import com.ts.model.pojo.common.Goods;
import com.ts.model.pojo.common.User;
/**
 * 
 * @author tianle zh
 * @date 2015年11月19日
 */
public interface UserDAOInter {

	/**
	 * 获得所有的user
	 * @return
	 */
	public List<User> selectUserList();
	
	/**
	 * 获得所有的goods
	 * @return
	 */
	public List<Goods> selectGoods();
	
	/**
	 * 根据id获得goods
	 * @param id goods id
	 * @return
	 */
	public Goods selectGoodsbyID(String id);
}
