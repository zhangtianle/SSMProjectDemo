package com.ts.model.vo.example;

import java.util.List;

import com.ts.model.pojo.common.Goods;
import com.ts.model.pojo.common.User;

/**
 * User Goods 混合对象
 * 
 * @author tianle zh
 * @date 2015年12月4日
 */
public class UserGoodsVO {
	
	private List<User> users;
	private List<Goods> goodses;
	
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public List<Goods> getGoodses() {
		return goodses;
	}
	public void setGoodses(List<Goods> goodses) {
		this.goodses = goodses;
	}


}
