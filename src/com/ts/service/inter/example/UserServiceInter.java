package com.ts.service.inter.example;

import java.util.List;
import java.util.Map;

import com.ts.model.pojo.common.Goods;
import com.ts.model.pojo.common.User;

/**
 * 
 * @author tianle zh
 * @date 2015年11月19日
 */
public interface UserServiceInter {
	/**
	 * 获得所有的user
	 * @return
	 */
	public List<User> getUser();
	
	/**
	 * 获得所有的goods
	 * @return
	 */
	public List<Goods> getGoods();
	
	/**
	 * 根据id获得goods
	 * @param id goods编号
	 * @return
	 */
	public Map<Object, Object> selectGoodsbyID(String id);
}
