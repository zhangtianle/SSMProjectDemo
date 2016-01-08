package com.ts.controller.example;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ts.model.pojo.common.Goods;
import com.ts.model.vo.example.UserGoodsVO;
import com.ts.service.inter.example.UserServiceInter;

/**
 * 采购管理控制类，baseurl='example'
 * 
 * @author Kyle
 * @date 2015年11月18日
 */
@Controller
@RequestMapping("example")
public class ExampleController {

	@Resource
	private UserServiceInter userService;
	

	@RequestMapping("login.do")
	public String login() {
		System.out.println(userService.getUser().get(0).getName());
		return "login";
	}

	/**
	 * 获得采购订单商品信息的内容
	 * http://localhost:8080/SSMProjectDemo/example/getGoods.do
	 * @param type
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "getGoods.do", method = RequestMethod.GET)
	public String purchaseOrders(HttpServletResponse response) {
		try {
			response.getWriter().write(userService.getGoods().toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	
	/**
	 * 根据id获得商品信息
	 * http://localhost:8080/SSMProjectDemo/example/getGoodsbyID.do?id=1
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "getGoodsbyID.do", method = RequestMethod.GET)
	@ResponseBody
	public Map<Object, Object> getGoodsbyID(@RequestParam("id") String id) {
		return userService.selectGoodsbyID(id);
	}

	/**
	 * 从前台接收json  [{id: "test", name: "tianle", guige: "123"}, {id: "ququ", name: "tianle2", guige: "123"}]
	 * http://localhost:8080/SSMProjectDemo/test/MyHtml.html
	 * @param goods
	 * @throws IOException 
	 */
	@RequestMapping(value = "saveGoods.do")
	public void saveUser(@RequestBody List<Goods> goods, HttpServletResponse response) throws IOException {
		System.out.println("saveGoods : " + goods.get(0).getName());
		response.getWriter().write(goods.get(0).getName());
	}
	
	
	/**
	 * 从前台接收复杂json
	 * http://localhost:8080/SSMProjectDemo/test/MyHtml.html
	 * @param userGoodsVO
	 */
	@RequestMapping(value = "UserGoodsVO.do")
	public void SaveUserGoodsVO(@RequestBody UserGoodsVO userGoodsVO) {
		// 测试输出
		System.out.println("UserGoodsVO 1 : " + userGoodsVO.getGoodses().get(0).getName());
		System.out.println("UserGoodsVO 2 : " + userGoodsVO.getUsers().get(0).getName());
	}
}


