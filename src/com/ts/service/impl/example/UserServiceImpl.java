package com.ts.service.impl.example;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.junit.Test;
import org.springframework.stereotype.Service;

import com.ts.DAO.inter.example.UserDAOInter;
import com.ts.model.pojo.common.Goods;
import com.ts.model.pojo.common.User;
import com.ts.service.inter.example.UserServiceInter;
/**
 * 
 * @author tianle zh
 * @date 2015年11月19日
 */
@Service
public class UserServiceImpl implements UserServiceInter{
	
	@Resource
	private UserDAOInter userDAO;

	@Override
	public List<User> getUser() {
		return userDAO.selectUserList();
	}
	
	@Override
	public JSONArray getGoods() {
		JSONArray al = JSONArray.fromObject(userDAO.selectGoods());
		JSONObject jsonObject = JSONObject.fromObject(null);
		return al;
	}
	
	@Override
	public Map<Object, Object> selectGoodsbyID(String id) {
		Goods goods = userDAO.selectGoodsbyID(id);
		Map<Object, Object> m = new HashMap<Object, Object>();
		m.put("goods", goods);
		return m;
	}

}
